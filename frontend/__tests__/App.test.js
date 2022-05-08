import renderer from 'react-test-renderer';
import App from "../src/App";
import AuthProvider from "../src/context/AuthProvider";
import {BrowserRouter} from "react-router-dom";

it('renders correctly', () => {
    const app = renderer.create(
        <BrowserRouter>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </BrowserRouter>)
        .toJSON();
    expect(app).toMatchSnapshot();
});
