export class ApiService {

  protected url = 'https://admire.social/api/v1.0/';

  getDistance(a: any, b: any): number {
    return 6371 * 1000 * Math.acos(
      Math.sin(a.lat * Math.PI / 180) * Math.sin(b.lat * Math.PI / 180) +
      Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) *
      Math.cos(a.lng * Math.PI / 180 - b.lng * Math.PI / 180)
    );
  }
}
