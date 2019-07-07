import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import Home from '../components/Home';
import homeActions from '../actions/home';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  const user = bindActionCreators(homeActions, dispatch);
  return {
    // onLogin: (data) => {
    //   user.login(data);
    //   dispatch(push('/loggedin'));
    // },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
