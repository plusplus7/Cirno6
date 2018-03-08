from tornado import web
from tornado import gen
import json
import psycopg2

class BaseHandler(web.RequestHandler):
     def initialize(self, db):
         self.db = db

class ArticleHandler(BaseHandler):
    @gen.coroutine
    def get(self, link):
        try:
            task = self.db.execute('SELECT * FROM Article WHERE link = %s LIMIT 1', (link, ))
            yield task
            cursor = task.result()

        except (psycopg2.Warning, psycopg2.Error) as error:
            print(str(error))
            raise web.HTTPError(status_code=500, reason="Database failure.")
            self.finish()

        else:
            result = cursor.fetchone()
            
            if (result == None):
                raise web.HTTPError(status_code=404, reason="No such article.")

            self.write({
                'link': result['link'],
                'contentType': result['contenttype'],
                'content': result['content'],
            })
            self.finish()

class ArticleInfoHandler(BaseHandler):
    @gen.coroutine
    def get(self, tag):
        try:
            tags = [tag,]
            task = self.db.execute('SELECT * FROM ArticleInfo WHERE tags @> %s::varchar(20)[] LIMIT 77', (tags,) )
            yield task
            cursor = task.result()

        except (psycopg2.Warning, psycopg2.Error) as error:
            print(str(error))
            raise web.HTTPError(status_code=500, reason="Database failure.")
            self.finish()

        else:
            results = cursor.fetchall()
            if (results == None):
                raise web.HTTPError(status_code=404, reason="No such article.")

            self.write(json.dumps(map(
                lambda x: {
                    'link': x['link'],
                    'contentType': x['contenttype'],
                    'createDate': x['createddate'].strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
                    'content': x['content'],
                    'tags': x['tags'],
                }
                , results)
            ))
            self.finish()
