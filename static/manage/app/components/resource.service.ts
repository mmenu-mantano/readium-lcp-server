import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Resource } from './resource';

@Injectable()
export class ResourceService {
  private resourceUrl = 'http://localhost:8989/contents';  // THIS SHOULD BE EQUAL TO THE URL of the lcp webserver+/contents )
  // private headers = new Headers ({'Content-Type': 'application/json'});

  constructor (private http: Http) { }
  getResources(): Promise<Resource[]> {
    return this.http.get(this.resourceUrl)
      .toPromise()
      .then(function (response) {
        let resources: Resource[] = [];
        for (let jsonResult of response.json()) {
          resources[resources.length] = {
              id: jsonResult.id, location: jsonResult.location, length: jsonResult.length, sha256: jsonResult.sha356
            };
        }
        return resources;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  getUser(id: string): Promise<Resource> {
      return this.getResources()
      .then(resources => resources.find(resource => resource.id === id));
  }
}
