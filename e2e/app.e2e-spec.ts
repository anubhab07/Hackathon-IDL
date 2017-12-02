import { XLogisticsPage } from './app.po';

describe('xlogistics App', () => {
  let page: XLogisticsPage;

  beforeEach(() => {
    page = new XLogisticsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
