const premiumTagClass = 'premium-article';
const articleTagClass = 'article-body-wrapper';
const adsTagClass = 'obs-ad-container';

// Observer instance
const observer = (actions) => new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    actions(mutation);
  });
});

// Article mutation handler
const articleContainerMutation = ({ target: { style } }) => {
  style.overflow = 'visible'; // eslint-disable-line no-param-reassign
  style['max-height'] = 'unset'; // eslint-disable-line no-param-reassign
};

// Listen for messages
chrome.runtime.onMessage.addListener(({ command }, sender, callback) => {
  if (command !== 'unlock') {
    callback({ result: 'undefined action' });
    return;
  }

  try {
    // Remove iframe ad
    const [mainContainer] = document.getElementsByTagName('main');
    const [ad] = mainContainer.getElementsByClassName(adsTagClass);
    mainContainer.removeChild(ad);
    document.body.style.overflow = 'visible';
  } catch (err) {}

  // Check if it's a premium article
  const isPremiumArticle = document.getElementsByClassName(premiumTagClass);

  if (!isPremiumArticle.length) {
    callback({ result: 'notPremiumArticle' });
    return;
  }

  // Remove premium protection
  const [article] = document.getElementsByClassName(articleTagClass);
  observer(articleContainerMutation).observe(article, { attributes: true });

  callback({ result: article });
});
