CREATE TABLE Article (
    link varchar(50),
    contentType varchar(20),
    content text,
    PRIMARY KEY(link)
);

CREATE TABLE ArticleInfo (
    link varchar(50),
    contentType varchar(20),
    createdDate timestamp,
    content text, 
    tags varchar(20)[],
    PRIMARY KEY(link)
);

CREATE INDEX index_name ON table_name (column1_name, column2_name)
