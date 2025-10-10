import { c } from "@contember/schema-definition";
import { Contact } from "./Contact";
import { Inquiry } from "./Inquiry";
import { Offer } from "./Offer/Offer";
import { Person } from "./Person";
import { Task } from "./Task";
import { Activity } from "./events/Activity";

export class User {
  createdAt = c.dateTimeColumn().notNull().default("now");
  createdOffers = c.oneHasMany(Offer, "createdBy");
  assignedOffers = c.oneHasMany(Offer, "assignedTo");
  assignedTasks = c.oneHasMany(Task, "assignedTo");
  inquiries = c.oneHasMany(Inquiry, "createdBy");
  activities = c.oneHasMany(Activity, "createdBy");
  person = c.oneHasOne(Person, "userPerson");
  contacts = c.oneHasMany(Contact, "owner");

  handledInquiries = c.oneHasMany(Inquiry, "handler");
  recommendedBy = c.manyHasOne(User, "recommendedUsers");
  recommendedUsers = c.oneHasMany(User, "recommendedBy");
}
