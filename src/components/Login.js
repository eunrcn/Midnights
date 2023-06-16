import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // for google login
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      navigate("/");
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <>
      <Card style={{ backgroundColor: "transparent", border: 0 }}>
        <Card.Body>
          {/* log in header */}
          <h2
            className="text-center mb-4"
            style={{
              fontSize: 20,
              color: "#bd9dee",
              backgroundColor: "white",
              opacity: 0.9,
            }}
          >
            <b>- Discover your finest creations -</b>
          </h2>

          {/* google log in */}
          <div className="text-center">
            <button
              className="login-with-google-btn"
              onClick={signInWithGoogle}
              style={{
                backgroundColor: "#6495ED",
                borderColor: "white",
                color: "white",
                fontSize: 15,
                borderRadius: 40,
                height: "60px",
                padding: 20,
                minWidth: 300,
                marginBottom: 15,
                marginTop: 15,
              }}
            >
              Sign in with Google
            </button>
          </div>
          <br />

          {/* adding something stupid here*/}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1, backgroundColor: "white", height: "3px" }} />

            <p style={{ margin: "0 10px", color: "white" }}>
              Or Sign-In With Email
            </p>

            <div style={{ flex: 1, backgroundColor: "white", height: "3px" }} />
          </div>
          {/*stupidity ends */}

          {/*email and password fill up */}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              {/* <Form.Label>Email</Form.Label> */}
              <Form.Control
                type="email"
                ref={emailRef}
                required
                placeholder="Email"
                style={{
                  borderRadius: 40,
                  height: "60px",
                  padding: 20,
                  minWidth: 300,
                  marginBottom: 15,
                  marginTop: 15,
                }}
              />
            </Form.Group>
            <Form.Group id="password">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                type="password"
                ref={passwordRef}
                required
                placeholder="Password"
                style={{
                  borderRadius: 40,
                  height: "60px",
                  padding: 20,
                  minWidth: 300,
                  marginBottom: 25,
                }}
              />
            </Form.Group>

            {/* log in button */}
            <div className="text-center">
              <Button
                disabled={loading}
                className="w;10"
                type="submit"
                style={{
                  backgroundColor: "#bd9dee",
                  borderColor: "white",
                  borderRadius: 25,
                  height: 35,
                  fontSize: 15,
                  minWidth: 100,
                }}
              >
                Log In
              </Button>
            </div>

            {/* forget password */}
            <div className="w-100 text-center mt-3">
              <Link style={{ color: "white" }} to="/forgot-password">
                Forgot Password?
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2" style={{ color: "#efd5d1" }}>
        <b>
          Need an account?{" "}
          <Link to="/signup" style={{ color: "#efd5d1" }}>
            Sign Up
          </Link>
        </b>
      </div>
      <br />
    </>
  );
}
