import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface Record {
  שם_ישוב_לועזי: string;
}

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  constructor(private http: HttpClient) {}

  // service to get all cities names
  getCitiesAction() {
    const api =
      'https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&q=&limit=9999';
    return this.http
      .get(api)
      .pipe(
        map((response: any) =>
          response.result.records.map((record: Record) => record.שם_ישוב_לועזי)
        )
      );
  }
}
