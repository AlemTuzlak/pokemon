import React from 'react';

import Header from '../Layout/Header';
import MobileHeader from '../Layout/MobileHeader';
import { isMobile } from 'react-device-detect';

const FrontendLayout = (Component) => {
    
    class Layout extends React.Component {
        componentDidMount(){
            document.getElementById('content').scrollTop = 0;
        }
        componentDidUpdate() {
            document.getElementById('content').scrollTop = 0;
        }
        render(){
            return (
                <React.Fragment>
                    {isMobile ? <MobileHeader /> : <Header />}
                    <div id="content" className="content-container">
                        <Component key={window.location.pathname} />
                    </div>
                </React.Fragment>
            );
        }
    }
    
    return Layout;
}

export default FrontendLayout;