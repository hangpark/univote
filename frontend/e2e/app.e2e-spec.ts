import { UnivotePage } from './app.po';

describe('univote App', () => {
  let page: UnivotePage;

  beforeEach(() => {
    page = new UnivotePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
