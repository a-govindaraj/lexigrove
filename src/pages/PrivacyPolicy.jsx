import { Box, Container, Typography, Paper } from '@mui/material';

function PrivacyPolicy() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight={700} color="primary">
            Privacy Policy
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Last updated: January 27, 2026
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
            1. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            Lexigrove is designed with privacy in mind. Currently, we collect minimal information:
          </Typography>
          <Typography variant="body1" component="div" paragraph>
            • <strong>Usage Data:</strong> We may collect information about how you interact with our application, such as pages visited and features used.
            <br />
            • <strong>Device Information:</strong> Basic information about your device and browser for optimal functionality.
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
            2. How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            The information we collect is used to:
          </Typography>
          <Typography variant="body1" component="div" paragraph>
            • Provide and improve our vocabulary learning service
            <br />
            • Understand how users interact with our application
            <br />
            • Enhance user experience and functionality
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
            3. Data Storage
          </Typography>
          <Typography variant="body1" paragraph>
            We use session storage to temporarily cache word data during your browsing session. This data is automatically cleared when you close your browser.
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
            4. Third-Party Services
          </Typography>
          <Typography variant="body1" paragraph>
            We use the following third-party APIs to provide our service:
          </Typography>
          <Typography variant="body1" component="div" paragraph>
            • <strong>Datamuse API:</strong> For word suggestions
            <br />
            • <strong>Free Dictionary API:</strong> For word definitions and examples
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
            5. Cookies
          </Typography>
          <Typography variant="body1" paragraph>
            We do not currently use cookies. Any future use of cookies will be disclosed in an updated privacy policy.
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
            6. Your Rights
          </Typography>
          <Typography variant="body1" paragraph>
            As we don't collect personal information, there is no personal data to access, modify, or delete at this time.
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
            7. Children's Privacy
          </Typography>
          <Typography variant="body1" paragraph>
            Our service is not directed to children under 13. We do not knowingly collect information from children under 13.
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
            8. Changes to This Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
            9. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have questions about this Privacy Policy, please contact us through our Contact page.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default PrivacyPolicy;
