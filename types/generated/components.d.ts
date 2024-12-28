import type { Schema, Struct } from '@strapi/strapi';

export interface ActivitiesTicket extends Struct.ComponentSchema {
  collectionName: 'components_activities_tickets';
  info: {
    displayName: 'Ticket';
    icon: 'chartBubble';
  };
  attributes: {
    description: Schema.Attribute.Text;
    price: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ScheduleDaily extends Struct.ComponentSchema {
  collectionName: 'components_schedule_dailies';
  info: {
    displayName: 'Daily';
    icon: 'clock';
  };
  attributes: {
    friday: Schema.Attribute.Component<'schedule.monday', false>;
    monday: Schema.Attribute.Component<'schedule.monday', false>;
    saturday: Schema.Attribute.Component<'schedule.monday', false>;
    sunday: Schema.Attribute.Component<'schedule.monday', false>;
    thursday: Schema.Attribute.Component<'schedule.monday', false>;
    tuesday: Schema.Attribute.Component<'schedule.monday', false>;
    wednesday: Schema.Attribute.Component<'schedule.monday', false>;
  };
}

export interface ScheduleMonday extends Struct.ComponentSchema {
  collectionName: 'components_schedule_mondays';
  info: {
    description: '';
    displayName: 'A Single Day';
    icon: 'clock';
  };
  attributes: {
    end: Schema.Attribute.Time;
    start: Schema.Attribute.Time;
  };
}

export interface SharedLocation extends Struct.ComponentSchema {
  collectionName: 'components_shared_locations';
  info: {
    description: '';
    displayName: 'Location';
    icon: 'pinMap';
  };
  attributes: {
    address: Schema.Attribute.String & Schema.Attribute.Required;
    direction: Schema.Attribute.Text;
    district: Schema.Attribute.Relation<'oneToOne', 'api::district.district'>;
    mappoint: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<
        'plugin::geodata.geojson',
        {
          info: true;
        }
      >;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'activities.ticket': ActivitiesTicket;
      'schedule.daily': ScheduleDaily;
      'schedule.monday': ScheduleMonday;
      'shared.location': SharedLocation;
      'shared.quote': SharedQuote;
      'shared.seo': SharedSeo;
    }
  }
}
