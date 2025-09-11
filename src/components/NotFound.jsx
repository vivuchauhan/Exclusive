export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "70vh" }}>
      <h1 className="text-danger">404</h1>
      <h3 className="text-dark">Page Not Found</h3>
      <p className="text-muted">The page you’re looking for doesn’t exist.</p>
    </div>
  );
}
