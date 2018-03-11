#-*- coding: UTF-8 -*-
import momoko
import psycopg2
from tornado import gen

class Storage():
    def __init__(self, ioloop, connection_string, pool_size):
        self.ioloop = ioloop
        self.pool = momoko.Pool(
            dsn=connection_string,
            size=pool_size,
            ioloop=ioloop,
            cursor_factory=psycopg2.extras.DictCursor
        )

    def connect(self):
        future = self.pool.connect()
        self.ioloop.add_future(future , lambda x: self.ioloop.stop())
        self.ioloop.start()
        future.result()

    def close(self):
        future = self.pool.close()
        self.ioloop.add_future(future , lambda x: self.ioloop.stop())
        self.ioloop.start()
        future.result()

    def get_conn(self):
        return self.pool

    @gen.coroutine
    def get_article_by_link(self, link):
        try:
            task = self.pool.execute('SELECT * FROM Article WHERE link = %s LIMIT 1', (link, ))
            yield task
            cursor = task.result()

        except (psycopg2.Warning, psycopg2.Error) as error:
            print(str(error))
            raise web.HTTPError(status_code=500, reason="Database failure.")

        else:
            result = cursor.fetchone()
            
            if (result == None):
                raise web.HTTPError(status_code=404, reason="No such article.")

            raise gen.Return({
                'link': result['link'],
                'contentType': result['contenttype'],
                'content': result['content'],
            })

    @gen.coroutine
    def get_articleinfos_by_tag(self, tag):
        try:
            tags = [tag, ]
            task = self.pool.execute('SELECT * FROM ArticleInfo WHERE tags @> %s::varchar(20)[] LIMIT 77', (tags,) )
            yield task
            cursor = task.result()

        except (psycopg2.Warning, psycopg2.Error) as error:
            print(str(error))
            raise web.HTTPError(status_code=500, reason="Database failure.")

        else:
            results = cursor.fetchall()
            if (results == None):
                raise web.HTTPError(status_code=404, reason="No such article.")

            raise gen.Return(map(
                lambda x: {
                    'link': x['link'],
                    'contentType': x['contenttype'],
                    'createDate': x['createddate'].strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
                    'content': x['content'],
                    'tags': x['tags'],
                }
                , results
                )
            )
