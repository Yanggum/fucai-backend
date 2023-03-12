drop database fucai;
create database fucai CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
use fucai;

create table fucai.users
(
    id                 bigint unsigned auto_increment
        primary key,
    name               varchar(255)                            not null,
    email              varchar(191)                            not null,
    encrypted_password varchar(255)                            not null,
    created_at         timestamp default CURRENT_TIMESTAMP     not null on update CURRENT_TIMESTAMP,
    updated_at         timestamp default '0000-00-00 00:00:00' not null,
    constraint email
        unique (email)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

create table fucai.characters
(
    id             bigint unsigned auto_increment
        primary key,
    slug           varchar(191)                            null,
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
    constraint characters_ibfk_1
        foreign key (creator_id) references fucai.users (id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

create table fucai.chats
(
    id         varchar(16)                              not null
        primary key,
    creator_id bigint unsigned                         not null,
    name       varchar(191)                            null,
    created_at timestamp default CURRENT_TIMESTAMP     not null on update CURRENT_TIMESTAMP,
    updated_at timestamp default '0000-00-00 00:00:00' not null,
    constraint chats_ibfk_1
        foreign key (creator_id) references fucai.users (id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

create table fucai.chat_participants
(
    id           bigint unsigned auto_increment
        primary key,
    chat_id      varchar(16)      not null,
    character_id bigint unsigned not null,
    constraint index_chat_participants_on_chat_id_and_character_id
        unique (chat_id, character_id),
    constraint chat_participants_ibfk_1
        foreign key (chat_id) references fucai.chats (id),
    constraint chat_participants_ibfk_2
        foreign key (character_id) references fucai.characters (id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

create index index_chat_participants_on_character_id
    on fucai.chat_participants (character_id);

create index creator_id
    on fucai.chats (creator_id);

CREATE TABLE chat_item (
   id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
   chat_id VARCHAR(16) NOT NULL,
   creator_id BIGINT UNSIGNED NOT NULL,
   type VARCHAR(255) NOT NULL,
   content TEXT,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
   updated_at TIMESTAMP DEFAULT '0000-00-00 00:00:00' NOT NULL,
   CONSTRAINT fk_chat_item_chat_id FOREIGN KEY (chat_id) REFERENCES fucai.chats (id),
   CONSTRAINT fk_chat_item_author_id FOREIGN KEY (creator_id) REFERENCES fucai.users (id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

INSERT INTO fucai.users (id, name, email, encrypted_password, created_at, updated_at) VALUES (1, 'test', 'bak405@naver.com', '$2b$10$qYqD0f/Jh699B3Rz8cW1RuUrZRh9W63e84/5sQcD2yQEHlOEACOwm', '2023-03-13 04:37:09', '2023-03-13 04:37:09');
INSERT INTO fucai.chats (id, creator_id, name, created_at, updated_at) VALUES ('0b8671a0-a773-4f', 1, 'test', '2023-03-12 19:39:58', '0000-00-00 00:00:00');
INSERT INTO fucai.chats (id, creator_id, name, created_at, updated_at) VALUES ('a1207118-314c-47', 1, 'test', '2023-03-12 19:38:39', '0000-00-00 00:00:00');
INSERT INTO fucai.characters (id, slug, name, description, avatar_id, greeting, persona, world_scenario, example_chats, visibility, is_contentious, creator_id, created_at, updated_at) VALUES (1, 'test', 'John Doe1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis mauris id eros rutrum, in faucibus tortor luctus. Nullam sagittis lorem non posuere pretium.', 'AVATAR_JOHN_DOE', 'HI, I\'M JOHN! NICE TO MEET YOU!', 'FRIENDLY, OUTGOING, AND ALWAYS READY TO MAKE NEW FRIENDS.', 'JOHN LIVES IN A SMALL TOWN IN THE MIDWESTERN UNITED STATES.', 'JOHN: HI, WHAT\'S YOUR NAME?
STRANGER: HI, I\'M SARAH. NICE TO MEET YOU!
 JOHN: NICE TO MEET YOU TOO, SARAH!', 'public', 0, 1, '2023-03-12 19:38:15', '0000-00-00 00:00:00')
