import { NightlifePage } from './app.po';

describe('nightlife App', () => {
  let page: NightlifePage;

  beforeEach(() => {
    page = new NightlifePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
