/*eslint no-extend-native: ["error", { "exceptions": ["String"] }]*/

const html_unescape = html => html.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
String.prototype.trunc = String.prototype.trunc ||
  function (n) {
    return (this.length > n) ? this.substr(0, n - 1) + '...' : this;
  }
const parseWhen = when => (when.indexOf('dni') !== -1) || (when.indexOf('dzień') !== -1) || (when.indexOf('godzin') !== -1) || (when.indexOf('minut') !== -1) ? when + ' temu' : when;

const parseTime = (string) => {

  const lang = {
    'stycznia': 'January',
    'lutego': 'February',
    'marca': 'March',
    'kwietnia': 'April',
    'maja': 'May',
    'czerwca': 'June',
    'lipca': 'July',
    'sierpnia': 'August',
    'września': 'September',
    'października': 'October',
    'listopada': 'November',
    'grudnia': 'December'
  }

  const int = parseInt(string);
  const monthString = string.substring(string.indexOf(' ') + 1);
  const currentYear = new Date().getFullYear();

  if (string.indexOf('sekund') !== -1)
    return Math.abs(new Date() - int * 1000);
  else if (string.indexOf('minut') !== -1)
    return Math.abs(new Date() - int * 60 * 1000);
  else if (string.indexOf('godzin') !== -1)
    return Math.abs(new Date() - int * 60 * 1000 * 60);
  else if (string.indexOf('dzień') !== -1 || string.indexOf('dni') !== -1)
    return Math.abs(new Date() - int * 60 * 1000 * 60 * 24);
  else
    return Date.parse(`${lang[monthString]} ${int}, ${currentYear}`);

}

module.exports = { String, html_unescape, parseWhen, parseTime } 