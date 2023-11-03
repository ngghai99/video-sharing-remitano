import React from 'react'

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Funny Movies
        </a>
        <div className="float-end login-form">
          <form className="d-flex">
            <input
              className="form-control me-2"
              placeholder="Email"
              aria-label="Email"
            />
            <input
              className="form-control me-2"
              placeholder="Password"
              aria-label="Password"
            />
            <button className="btn btn-outline-success btn-login" type="submit">
              Login / Register
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}
