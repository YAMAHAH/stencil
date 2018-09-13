import { setupDomTests, flush } from '../util';


describe('lifecycle-on-ready', function() {
  const { setupDom, tearDownDom } = setupDomTests(document);
  let app: HTMLElement;

  beforeEach(async () => {
    app = await setupDom('/lifecycle-on-ready/index.html');
  });
  afterEach(tearDownDom);

  it('fire load methods in order', async () => {
    let loads = app.querySelectorAll('#output li');
    expect(loads.length).toBe(2);
    expect(loads[0].textContent).toBe('lifecycle-on-ready-a componentWillLoad');
    expect(loads[1].textContent).toBe('lifecycle-on-ready-a componentDidLoad');

    const button = app.querySelector('button');
    button.click();
    await flush(app);

    loads = app.querySelectorAll('#output li');
    expect(loads.length).toBe(10);
    expect(loads[0].textContent).toBe('lifecycle-on-ready-a componentWillLoad');
    expect(loads[1].textContent).toBe('lifecycle-on-ready-a componentDidLoad');
    expect(loads[2].textContent).toBe('async add child components to lifecycle-on-ready-a 1');
    expect(loads[3].textContent).toBe('lifecycle-on-ready-a componentWillUpdate 1');
    expect(loads[4].textContent).toBe('lifecycle-on-ready-b componentWillLoad 1');
    expect(loads[5].textContent).toBe('lifecycle-on-ready-c componentWillLoad 1');
    expect(loads[6].textContent).toBe('lifecycle-on-ready-c componentDidLoad 1');
    expect(loads[7].textContent).toBe('lifecycle-on-ready-b componentDidLoad 1');
    expect(loads[8].textContent).toBe('lifecycle-on-ready-a componentDidUpdate 1');
    expect(loads[9].textContent).toBe('TestApp.onReady() resolved 1');

    button.click();
    await flush(app);

    loads = app.querySelectorAll('#output li');
    expect(loads.length).toBe(18);
    expect(loads[0].textContent).toBe('lifecycle-on-ready-a componentWillLoad');
    expect(loads[1].textContent).toBe('lifecycle-on-ready-a componentDidLoad');
    expect(loads[2].textContent).toBe('async add child components to lifecycle-on-ready-a 1');
    expect(loads[3].textContent).toBe('lifecycle-on-ready-a componentWillUpdate 1');
    expect(loads[4].textContent).toBe('lifecycle-on-ready-b componentWillLoad 1');
    expect(loads[5].textContent).toBe('lifecycle-on-ready-c componentWillLoad 1');
    expect(loads[6].textContent).toBe('lifecycle-on-ready-c componentDidLoad 1');
    expect(loads[7].textContent).toBe('lifecycle-on-ready-b componentDidLoad 1');
    expect(loads[8].textContent).toBe('lifecycle-on-ready-a componentDidUpdate 1');
    expect(loads[9].textContent).toBe('TestApp.onReady() resolved 1');
    expect(loads[10].textContent).toBe('async add child components to lifecycle-on-ready-a 2');
    expect(loads[11].textContent).toBe('lifecycle-on-ready-a componentWillUpdate 2');
    expect(loads[12].textContent).toBe('lifecycle-on-ready-b componentWillLoad 2');
    expect(loads[13].textContent).toBe('lifecycle-on-ready-c componentWillLoad 2');
    expect(loads[14].textContent).toBe('lifecycle-on-ready-c componentDidLoad 2');
    expect(loads[15].textContent).toBe('lifecycle-on-ready-b componentDidLoad 2');
    expect(loads[16].textContent).toBe('lifecycle-on-ready-a componentDidUpdate 2');
    expect(loads[17].textContent).toBe('TestApp.onReady() resolved 2');
  });

});
