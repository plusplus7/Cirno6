#-*- coding: UTF-8 -*-
import momoko
import psycopg2

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
