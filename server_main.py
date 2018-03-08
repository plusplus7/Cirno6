import tornado.web
from tornado.options import define, options
import tornado.ioloop
import os
from handlers import *
from storage import *

define("db_connstr", help="PostgreSQL connection string")
define("port", default="44321", help="Port for hosting service")

settings = {
    "debug"         : True,
    "gzip"          : True,
}

def main(host="0.0.0.0", port=44321):
    ioloop = tornado.ioloop.IOLoop.instance()
    s = Storage(ioloop, options.db_connstr, 1)

    s.connect()

    urls = [
        (r'/article/(?P<link>[a-zA-Z0-9-_]+)', ArticleHandler, dict(db=s.get_conn())),
        (r'/articleinfos/(?P<tag>[a-zA-Z1-9-_]+)', ArticleInfoHandler, dict(db=s.get_conn())),
    ]
    app = tornado.web.Application(urls, **settings)
    app.listen(port, host)
    ioloop.start()
    s.close()

if __name__ == "__main__":
    tornado.options.parse_command_line()
    main("0.0.0.0", options.port)
