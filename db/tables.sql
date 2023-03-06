create database fucai;
use fucai;

create table fucai.users
(
    id                 bigint unsigned auto_increment
        primary key,
    email              varchar(191)                            not null,
    encrypted_password varchar(255)                            not null,
    created_at         timestamp default CURRENT_TIMESTAMP     not null on update CURRENT_TIMESTAMP,
    updated_at         timestamp default '0000-00-00 00:00:00' not null,
    constraint email
        unique (email)
);

create table fucai.characters
(
    id             bigint unsigned auto_increment
        primary key,
    slug           varchar(191)                            not null,
    name           varchar(255)                            null,
    description    text                                    null,
    avatar_id      varchar(255)                            null,
    greeting       text                                    null,
    persona        text                                    null,
    world_scenario text                                    null,
    example_chats  text                                    null,
    visibility     varchar(255)                            null,
    is_contentious tinyint(1)                              null,
    creator_id     bigint unsigned                         null,
    created_at     timestamp default CURRENT_TIMESTAMP     not null on update CURRENT_TIMESTAMP,
    updated_at     timestamp default '0000-00-00 00:00:00' not null,
    constraint slug
        unique (slug),
    constraint characters_ibfk_1
        foreign key (creator_id) references fucai.users (id)
);

create index creator_id
    on fucai.characters (creator_id);

create index index_characters_on_slug
    on fucai.characters (slug);

create table fucai.chats
(
    id         binary(16)                              not null
        primary key,
    creator_id bigint unsigned                         not null,
    name       varchar(191)                            null,
    created_at timestamp default CURRENT_TIMESTAMP     not null on update CURRENT_TIMESTAMP,
    updated_at timestamp default '0000-00-00 00:00:00' not null,
    constraint chats_ibfk_1
        foreign key (creator_id) references fucai.users (id)
);

create table fucai.chat_participants
(
    id           bigint unsigned auto_increment
        primary key,
    chat_id      binary(16)      not null,
    character_id bigint unsigned not null,
    constraint index_chat_participants_on_chat_id_and_character_id
        unique (chat_id, character_id),
    constraint chat_participants_ibfk_1
        foreign key (chat_id) references fucai.chats (id),
    constraint chat_participants_ibfk_2
        foreign key (character_id) references fucai.characters (id)
);

create index index_chat_participants_on_character_id
    on fucai.chat_participants (character_id);

create index creator_id
    on fucai.chats (creator_id);

