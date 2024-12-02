import { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
} from '@mui/material'
import {
  Add as AddIcon,
  DirectionsRun,
  DirectionsBike,
  Pool,
  Hiking,
  Delete as DeleteIcon,
} from '@mui/icons-material'

const activityTypes = [
  { name: 'Running', icon: DirectionsRun, color: '#f44336' },
  { name: 'Cycling', icon: DirectionsBike, color: '#2196f3' },
  { name: 'Swimming', icon: Pool, color: '#00bcd4' },
  { name: 'Hiking', icon: Hiking, color: '#4caf50' },
]

const ActivityCard = ({ activity, onDelete }) => {
  const activityType = activityTypes.find((type) => type.name === activity.type)
  const Icon = activityType?.icon || DirectionsRun

  return (
    <Card sx={{ height: '100%', position: 'relative' }}>
      <IconButton
        size="small"
        onClick={() => onDelete(activity.id)}
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        <DeleteIcon />
      </IconButton>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Icon sx={{ color: activityType?.color, mr: 1 }} />
          <Typography variant="h6">{activity.type}</Typography>
        </Box>
        <Typography color="text.secondary" gutterBottom>
          {activity.date}
        </Typography>
        <Typography variant="body2">Distance: {activity.distance} km</Typography>
        <Typography variant="body2">Duration: {activity.duration} minutes</Typography>
        <Typography variant="body2">
          Pace: {(activity.duration / activity.distance).toFixed(2)} min/km
        </Typography>
        {activity.notes && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Notes: {activity.notes}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

const Activities = () => {
  const [open, setOpen] = useState(false)
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'Running',
      date: '2024-01-10',
      distance: 5.2,
      duration: 30,
      notes: 'Morning run in the park',
    },
    {
      id: 2,
      type: 'Cycling',
      date: '2024-01-09',
      distance: 15.5,
      duration: 45,
      notes: 'Evening ride around the lake',
    },
  ])
  const [newActivity, setNewActivity] = useState({
    type: '',
    date: '',
    distance: '',
    duration: '',
    notes: '',
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setNewActivity({
      type: '',
      date: '',
      distance: '',
      duration: '',
      notes: '',
    })
  }

  const handleAdd = () => {
    setActivities([
      {
        ...newActivity,
        id: Date.now(),
        distance: parseFloat(newActivity.distance),
        duration: parseInt(newActivity.duration),
      },
      ...activities,
    ])
    handleClose()
  }

  const handleDelete = (id) => {
    setActivities(activities.filter((activity) => activity.id !== id))
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4">Activities</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Activity
        </Button>
      </Box>

      <Grid container spacing={3}>
        {activities.map((activity) => (
          <Grid item xs={12} sm={6} md={4} key={activity.id}>
            <ActivityCard activity={activity} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Activity</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Activity Type"
            value={newActivity.type}
            onChange={(e) =>
              setNewActivity({ ...newActivity, type: e.target.value })
            }
            fullWidth
            margin="normal"
          >
            {activityTypes.map((type) => (
              <MenuItem key={type.name} value={type.name}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <type.icon sx={{ color: type.color, mr: 1 }} />
                  {type.name}
                </Box>
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="date"
            label="Date"
            value={newActivity.date}
            onChange={(e) =>
              setNewActivity({ ...newActivity, date: e.target.value })
            }
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="number"
            label="Distance (km)"
            value={newActivity.distance}
            onChange={(e) =>
              setNewActivity({ ...newActivity, distance: e.target.value })
            }
            fullWidth
            margin="normal"
            inputProps={{ step: 0.1 }}
          />
          <TextField
            type="number"
            label="Duration (minutes)"
            value={newActivity.duration}
            onChange={(e) =>
              setNewActivity({ ...newActivity, duration: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Notes"
            value={newActivity.notes}
            onChange={(e) =>
              setNewActivity({ ...newActivity, notes: e.target.value })
            }
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleAdd}
            variant="contained"
            disabled={
              !newActivity.type ||
              !newActivity.date ||
              !newActivity.distance ||
              !newActivity.duration
            }
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Activities
