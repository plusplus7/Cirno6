from tornado import web
from tornado import gen
import json
import psycopg2

class BaseHandler(web.RequestHandler):
     def initialize(self, storage):
         self.storage = storage

class ArticleHandler(BaseHandler):
    @gen.coroutine
    def get(self, link):
        result = yield self.storage.get_article_by_link(link)
        self.write(result)
        self.finish()

class ArticleInfoHandler(BaseHandler):
    @gen.coroutine
    def get(self, tag):
        result = yield self.storage.get_articleinfos_by_tag(tag)
        self.write(json.dumps(result))
        self.finish()

class IndexHandler(BaseHandler):
    @gen.coroutine
    def get(self):
        self.write("")
        self.finish()
