import React, { PropTypes, Component } from 'react'
import { Nav, Navbar, NavItem, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Auth from '../../../utils/Auth.js'
import Notifier from '../../../utils/Notifier.js'

export default class NavigationBar extends Component {
    constructor(props, context) {
        super(props, context)
        this.logout = this.logout.bind(this)
    }

    logout() {
        const { onUserUpdate } = this.props

        Auth.logout().then(
            () => onUserUpdate(),
            xhrObj => { Notifier.error('Logout error', xhrObj); onUserUpdate() }
        )
    }

    componentDidMount() {
        $(() => {
            $('#navMenu').addClass('user-nav-bar')
        })
    }

    render() {
        const { profileForname, profileSurname } = this.context.user.profile
        const tabStyle = {
            textAlign: 'center',
            fontFamily: 'marianina_wd_fyregular',
            fontSize: '20px',
            marginRight: '5px',
            marginLeft: '5px'
        }

        return (

            <Navbar id='navMenu'>
                <Nav style={{ borderBottom: '0' }} className='front-navbar' bsStyle="tabs" activeKey={this.props.activeKey}>
                    <LinkContainer style={tabStyle} to={{ pathname: '/classes/available' }}>
                        <NavItem eventKey={1} href="/dashboard">AVAILABLE CLASSES</NavItem>
                    </LinkContainer>

                    <LinkContainer style={tabStyle} to={{ pathname: '/cart' }}>
                        <NavItem eventKey={2}>REGISTRATION CART</NavItem>
                    </LinkContainer>

                    <LinkContainer style={tabStyle} to={{ pathname: '/courses' }}>
                        <NavItem eventKey={3}>MY COURSES</NavItem>
                    </LinkContainer>

                    <LinkContainer style={tabStyle} to={{ pathname: '/donations' }}>
                        <NavItem eventKey={3}>DONATIONS</NavItem>
                    </LinkContainer>

                    <LinkContainer style={tabStyle} to={{ pathname: '/profile' }}>
                        <NavItem eventKey={4}>PROFILE</NavItem>
                    </LinkContainer>
                </Nav>

                <Nav style={{ marginRight: '15px', marginTop: '9px' }} className='front-navbar-right' pullRight>
                    <div>
                        <span style={{ marginRight: '10px', fontSize: '15px', verticalAlign: 'middle' }}>
                            {`Logged as ${profileForname} ${profileSurname}`}
                        </span>

                        <Button onClick={this.logout} bsStyle='warning'>
                            <span style={{ fontSize: '15px' }}>Logout</span>
                        </Button>
                    </div>
                </Nav>
            </Navbar>
        )
    }
}

NavigationBar.contextTypes = {
    user: PropTypes.object
}

NavigationBar.propTypes = {
    onUserUpdate: PropTypes.func.isRequired
}