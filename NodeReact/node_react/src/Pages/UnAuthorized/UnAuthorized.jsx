
import { Link } from 'react-router-dom'

const UnAuthorized = () => {
  return (
    <div>
      <h1>403- UnAuthorized</h1>
      <p>You do not have permission to access this page</p>
      <Link to={"/products"}>Products</Link>
    </div>
  )
}

export default UnAuthorized
