const jsonString = `
{
  "results": [
    {
      "datasource": {
        "sourcename": "openstreetmap",
        "attribution": "© OpenStreetMap contributors",
        "license": "Open Database License",
        "url": "https://www.openstreetmap.org/copyright"
      },
      "old_name": "Thăng Long",
      "country": "Vietnam",
      "country_code": "vn",
      "city": "Hanoi",
      "lon": 105.8544441,
      "lat": 21.0294498,
      "distance": 0,
      "formatted": "Hanoi, Vietnam",
      "address_line1": "Hanoi",
      "address_line2": "Vietnam",
      "category": "administrative",
      "timezone": {
        "name": "Asia/Bangkok",
        "offset_STD": "+07:00",
        "offset_STD_seconds": 25200,
        "offset_DST": "+07:00",
        "offset_DST_seconds": 25200
      },
      "result_type": "city",
      "rank": {
        "importance": 0.8282962332760695,
        "popularity": 5.666648878495769,
        "confidence": 1,
        "confidence_city_level": 1,
        "match_type": "full_match"
      },
      "place_id": "51a6704e36af765a4059addfa7058a073540f00101f9019c0b1d0000000000c00208",
      "bbox": {
        "lon1": 105.2848986,
        "lat1": 20.5645154,
        "lon2": 106.0200725,
        "lat2": 21.3852777
      }
    }
  ],
  "query": {
    "text": "Hanoi, Vietnam",
    "parsed": {
      "city": "hanoi",
      "country": "vietnam",
      "expected_type": "city"
    }
  }
}
`;
const jsonData = JSON.parse(jsonString);

const moment = require('moment-timezone');
const timezone = jsonData.results[0].timezone.name;
const currentTime = moment().tz(timezone).format();
console.log(currentTime);
