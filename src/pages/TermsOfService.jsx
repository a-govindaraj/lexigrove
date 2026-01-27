import { Box, Container, Typography, Paper } from '@mui/material';

function TermsOfService() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight={700} color="primary">
            Terms of Service
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Last updated: January 27, 2026
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" paragraph>
            By accessing and using WordAtWork, you accept and agree to be bound by the terms and provision of this agreement.
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
            2. Use License
          </Typography>
          <Typography variant="body1" paragraph>
            Permission is granted to temporarily access the materials (information or software) on WordAtWork for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </Typography>
          <Typography variant="body1" component="div" paragraph>
            • Modify or copy the materials
            <br />
            • Use the materials for any commercial purpose
            <br />
            • Attempt to decompile or reverse engineer any software contained on WordAtWork
            <br />
            • Remove any copyright or other proprietary notations from the materials
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
            3. Service Description
          </Typography>
          <Typography variant="body1" paragraph>
            WordAtWork provides a vocabulary learning platform focused on professional workplace communication. We offer:
          </Typography>
          <Typography variant="body1" component="div" paragraph>
            • Daily word recommendations
            <br />
            • Word definitions and usage examples
            <br />
            • Categorized vocabulary lists
            <br />
            • Educational content for professional development
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
            4. Disclaimer
          </Typography>
          <Typography variant="body1" paragraph>
            The materials on WordAtWork are provided on an 'as is' basis. WordAtWork makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
            5. Limitations
          </Typography>
          <Typography variant="body1" paragraph>
            In no event shall WordAtWork or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on WordAtWork.
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
            6. Accuracy of Materials
          </Typography>
          <Typography variant="body1" paragraph>
            The materials appearing on WordAtWork could include technical, typographical, or photographic errors. WordAtWork does not warrant that any of the materials on its website are accurate, complete, or current. We source our content from third-party APIs and make reasonable efforts to ensure accuracy.
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
            7. Links
          </Typography>
          <Typography variant="body1" paragraph>
            WordAtWork has not reviewed all of the sites linked to its application and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by WordAtWork of the site. Use of any such linked website is at the user's own risk.
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
            8. Modifications
          </Typography>
          <Typography variant="body1" paragraph>
            WordAtWork may revise these terms of service at any time without notice. By using this application you are agreeing to be bound by the then current version of these terms of service.
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
            9. Beta Version Notice
          </Typography>
          <Typography variant="body1" paragraph>
            WordAtWork is currently in beta. Features may change, and the service may be interrupted or discontinued at any time. We appreciate your understanding as we continue to improve.
          </Typography>

          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
            10. Governing Law
          </Typography>
          <Typography variant="body1" paragraph>
            These terms and conditions are governed by and construed in accordance with applicable laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default TermsOfService;
