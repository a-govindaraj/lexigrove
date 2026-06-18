import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import StarIcon from '@mui/icons-material/Star';

const ICONS = {
  work: WorkIcon,
  school: SchoolIcon,
  menu_book: MenuBookIcon,
  record_voice_over: RecordVoiceOverIcon,
};

// Renders the MUI icon for a track by its config `icon` name.
function TrackIcon({ name, sx }) {
  const Icon = ICONS[name] || StarIcon;
  return <Icon sx={sx} />;
}

export default TrackIcon;
