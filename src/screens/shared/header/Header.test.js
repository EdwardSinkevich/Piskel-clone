import Header from './Header';

describe('Header.render', () => {
  it('Should create Header correctly', () => {
    const header = document.createElement('header');
    header.id = 'header';
    document.body.appendChild(header);
    Header.render();
    expect(document.getElementById('header').innerHTML).toMatchSnapshot();
  });
});
