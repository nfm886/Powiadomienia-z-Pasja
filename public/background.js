/* global chrome */

const audioDiv = document.createElement('div');
const audio = document.createElement('audio');
audio.setAttribute('src', '/media/sounds/appointed.ogg');
document.body.append(audioDiv);
document.querySelector('div').prepend(audio);

const setDefaultSettings = () => {
  const defaultTheme = 'light';
  const defaultSounds = 'on';
  
  chrome.storage.sync.set({
    theme: defaultTheme,
    sounds : defaultSounds
  });
}

const stringToHTML = str => {
	const dom = document.createElement('div');
	dom.innerHTML = str;
	return dom;
};

const sound = document.querySelector('audio');
const playSound = sound => sound.play();

const getLastNotification = new Promise((resolve, reject) => {
  const nfyWhatArray = [];
  const formData = new FormData();
  const req = new XMLHttpRequest();

  formData.append('ajax', 'receiveNotify');
  req.open('POST', 'https://forum.pasja-informatyki.pl/eventnotify');
  req.onreadystatechange = e => {
    if(req.readyState === 4 && req.status === 200) {
      const response = req.response;

      if(response !== 'Userid is empty!') {
        const nfyWhat = stringToHTML(response).querySelectorAll('.nfyWhat');

        nfyWhat.forEach((item, key) => {
          nfyWhatArray.push(item.innerHTML.split('\n')[0]);
        });
        resolve(nfyWhatArray);
      }
      
    }
  }
  req.send(formData);
});

const updateBadgeNotification = () => {
  const req = new XMLHttpRequest();

  req.open('GET', 'https://forum.pasja-informatyki.pl/async-notifications');
  req.onreadystatechange = e => {
    if(req.readyState === 4 && req.status === 200) {
      const response = req.response;

      if(Number(response) > 0) {
        chrome.browserAction.setBadgeText({text: response});
        chrome.storage.sync.get(['sounds'], storage => {
          if(storage.sounds === 'on') {
            playSound(sound);
          } else if(storage.sounds === 'onlyPriv') {
            getLastNotification.then((data) => {
              for(let i = 0; i < Number(response); i++) {
                if(data[i].indexOf('Odebrano') !== -1) {
                  playSound(sound);
                }
              }
            });
          }
        });
      }
    }
  }
  req.send();
}

const updateBadge = () => {
  chrome.browserAction.getBadgeText({}, callback => {
    if(callback === "")
      updateBadgeNotification();
  });
}

setInterval(updateBadge, 1000*60);

chrome.runtime.onInstalled.addListener(setDefaultSettings);
chrome.runtime.onInstalled.addListener(updateBadge);