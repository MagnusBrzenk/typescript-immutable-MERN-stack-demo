import { expect } from "chai";

//Make the chai expect assertion function globally available in our tests
global.expect = expect;

//Add enzyme facilities to global window object
import { mount, render, shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

global.mount = mount;
global.render = render;
global.shallow = shallow;
