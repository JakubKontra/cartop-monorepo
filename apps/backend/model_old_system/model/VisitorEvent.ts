import { c } from "@contember/schema-definition";
import { CarRequest } from "./CarRequest";
import { publicRole } from "./acl";

@c.Allow(publicRole, {
  read: ["id"],
})
export class Visitor {
  name = c.stringColumn().notNull();
  code = c.stringColumn().unique();

  deals = c.oneHasMany(CarRequest, "source");

  legacySystemId = c.stringColumn().nullable().unique();
}

//   -- auto-generated definition
// create table visitor
// (
//     id         int auto_increment
//         primary key,
//     user_id    int          null,
//     cuid       varchar(36)  not null,
//     ip         varchar(40)  null,
//     user_agent varchar(255) null,
//     mobile     tinyint(1)   not null,
//     created_at datetime     not null,
//     referrer   varchar(255) null,
//     constraint FK_CAE5E19FA76ED395
//         foreign key (user_id) references user (id)
// )
//     engine = InnoDB
//     collate = utf8_unicode_ci;

// create index IDX_CAE5E19FA76ED395
//     on visitor (user_id);

// create index K_Visitor_Cuid
//     on visitor (cuid);

// -- auto-generated definition
// create table visitor_event
// (
//     id         int auto_increment
//         primary key,
//     visitor_id int          null,
//     offer_id   int          null,
//     type       varchar(255) not null,
//     url        longtext     null,
//     ip         varchar(255) null,
//     created_at datetime     not null,
//     referrer   varchar(255) null,
//     constraint FK_358B0E5E53C674EE
//         foreign key (offer_id) references offer (id),
//     constraint FK_358B0E5E70BEE6D
//         foreign key (visitor_id) references visitor (id)
// )
//     collate = utf8_unicode_ci;

// create index IDX_358B0E5E53C674EE
//     on visitor_event (offer_id);

// create index IDX_358B0E5E70BEE6D
//     on visitor_event (visitor_id);
