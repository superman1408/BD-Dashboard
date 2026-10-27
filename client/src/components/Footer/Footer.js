
function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                backgroundColor: "#11224a",
                color: "#ffffff",
                fontFamily: "Roboto, sans-serif",
                fontSize: "14px",
                textAlign: "center",
                padding: "12px 16px",
                boxSizing: "border-box",
                zIndex: 1000,
            }}
        >
            © {currentYear} ASHKAM ENERGY PRIVATE LIMITED. All rights reserved.
        </footer>
    );
}

export default Footer;
