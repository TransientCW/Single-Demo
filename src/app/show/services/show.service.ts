import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Show } from '../shared/model/show.model';

import * as uuid from 'uuid';
import { Page } from '../../shared/models/page.model';
import { Pageable } from '../../shared/models/pageable.model';

/**
 * This is just a stub.
 * This would normally be interacting with a backend API.
 */
@Injectable({
  providedIn: 'root'
})
export class ShowService {
  private _shows: Show[];

  constructor() {
    this._shows = this.defaultShows();
  }

  loadShows(pageable: Pageable): Observable<Page<Show>> {
    let start = pageable.page * pageable.size;
    let end = start + pageable.size;
    const content = this._shows.slice(start, end);
    console.log(start, end, content);
    return of({
      content,
      empty: content.length > 0,
      totalElements: content.length,
      first: pageable.page === 0,
      last: content.length === 0,
      number: pageable.page,
      totalPages: content.length / pageable.size,
    } as Page<Show>);
  }

  createShow(show: Show): Observable<Show> {
    let transformed = {
      ...show,
      createdAt: new Date(),
      id: uuid.v4(),
    };
    this._shows.push(transformed);
    return of(transformed);
  }

  deleteShow(show: Show): Observable<Show> {
    const found = this._shows.find(s => s.id == show.id);
    if (found) {
      this._shows = this._shows.filter(s => s.id != found.id);
    }
    return of(show);
  }

  /**
   * Some mock data
   */
  private defaultShows = (): Show[] => [
    {
      id: uuid.v4(),
      createdAt: new Date(),
      eventTime: new Date(Date.parse('2021-05-09')),
      artist: 'Yolanda Adams and Nashville Symphony',
      venue: 'Schermerhorn Symphony Center',
      ticketUrl: 'https://www.ticketmaster.com/yolanda-adams-with-the-nashville-symphony-nashville-tennessee-05-09-2021/event/1B005844CE47664E'
    },
    {
      id: uuid.v4(),
      createdAt: new Date(),
      eventTime: new Date(Date.parse('2021-04-20')),
      artist: 'Halsey, PVRIS',
      venue: 'Bridgestone Arena',
      ticketUrl: 'https://www.ticketmaster.com/halsey-2021-tour-nashville-tennessee-07-20-2021/event/1B00579BBDFA8082'
    },
    {
      id: uuid.v4(),
      createdAt: new Date(),
      eventTime: new Date(Date.parse('2021-06-19')),
      artist: 'Mötley Crüe and Def Leppard',
      venue: 'Nissan Stadium',
      ticketUrl: 'https://www.songkick.com/concerts/39350181-motley-crue-at-nissan-stadium'
    },
    {
      id: uuid.v4(),
      createdAt: new Date(),
      eventTime: new Date(Date.parse('2021-09-03')),
      artist: 'Deftones, Gojira and Poppy',
      venue: 'Nashville Municipal Auditorium',
      ticketUrl: 'https://www.songkick.com/concerts/39473921-deftones-at-nashville-municipal-auditorium'
    },
    {
      id: uuid.v4(),
      createdAt: new Date(),
      eventTime: new Date(Date.parse('2021-07-26')),
      artist: 'Justin Bieber',
      venue: 'Bridgestone Arena',
      ticketUrl: 'https://www.songkick.com/concerts/39380377-justin-bieber-at-bridgestone-arena'
    },
    {
      id: uuid.v4(),
      createdAt: new Date(),
      eventTime: new Date(Date.parse('2021-05-21')),
      artist: 'Alan Jackson',
      venue: 'Bridgestone Arena',
      ticketUrl: 'https://www.songkick.com/concerts/39297864-alan-jackson-at-bridgestone-arena'
    },
    {
      id: uuid.v4(),
      createdAt: new Date(),
      eventTime: new Date(Date.parse('2021-10-01')),
      artist: 'Harry Styles',
      venue: 'Bridgestone Arena',
      ticketUrl: 'https://www.songkick.com/concerts/39271500-harry-styles-at-bridgestone-arena'
    },
    {
      id: uuid.v4(),
      createdAt: new Date(),
      eventTime: new Date(Date.parse('2021-05-05')),
      artist: 'KALEO',
      venue: 'Ryman Auditorium',
      ticketUrl: 'https://www.songkick.com/concerts/39428200-kaleo-at-ryman-auditorium'
    },
    {
      id: uuid.v4(),
      createdAt: new Date(),
      eventTime: new Date(Date.parse('2021-08-14')),
      artist: 'John Legend',
      venue: 'Ryman Auditorium',
      ticketUrl: 'https://www.songkick.com/concerts/39463296-john-legend-at-ascend-amphitheater'
    },
    {
      id: uuid.v4(),
      createdAt: new Date(),
      eventTime: new Date(Date.parse('2021-07-30')),
      artist: 'Alicia Keys',
      venue: 'Ascend Amphitheater',
      ticketUrl: 'https://www.songkick.com/concerts/39418687-alicia-keys-at-ascend-amphitheater'
    },
  ]
}
