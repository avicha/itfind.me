import {
    connect
} from 'react-redux'
import Menu from '../components/menu'

const mapStateToProps = (state, ownProps) => ({
    url: state.url
})

const AdminMenu = connect(
    mapStateToProps
)(Menu)

export default AdminMenu