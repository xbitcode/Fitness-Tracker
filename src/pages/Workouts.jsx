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
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

const workoutTypes = [
  'Strength Training',
  'Cardio',
  'HIIT',
  'Yoga',
  'Pilates',
  'Swimming',
  'Cycling',
  'Running',
]

const WorkoutCard = ({ workout }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {workout.type}
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        {workout.date}
      </Typography>
      <Typography variant="body2">Duration: {workout.duration} minutes</Typography>
      <Typography variant="body2">
        Calories Burned: {workout.caloriesBurned}
      </Typography>
      {workout.notes && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Notes: {workout.notes}
        </Typography>
      )}
    </CardContent>
  </Card>
)

const Workouts = () => {
  const [open, setOpen] = useState(false)
  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      type: 'Strength Training',
      date: '2024-01-10',
      duration: 45,
      caloriesBurned: 320,
      notes: 'Upper body focus',
    },
    {
      id: 2,
      type: 'Cardio',
      date: '2024-01-09',
      duration: 30,
      caloriesBurned: 280,
      notes: 'Treadmill intervals',
    },
  ])
  const [newWorkout, setNewWorkout] = useState({
    type: '',
    date: '',
    duration: '',
    caloriesBurned: '',
    notes: '',
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setNewWorkout({
      type: '',
      date: '',
      duration: '',
      caloriesBurned: '',
      notes: '',
    })
  }

  const handleAdd = () => {
    setWorkouts([
      {
        ...newWorkout,
        id: Date.now(),
      },
      ...workouts,
    ])
    handleClose()
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
        <Typography variant="h4">Workouts</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Workout
        </Button>
      </Box>

      <Grid container spacing={3}>
        {workouts.map((workout) => (
          <Grid item xs={12} sm={6} md={4} key={workout.id}>
            <WorkoutCard workout={workout} />
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Workout</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Workout Type"
            value={newWorkout.type}
            onChange={(e) =>
              setNewWorkout({ ...newWorkout, type: e.target.value })
            }
            fullWidth
            margin="normal"
          >
            {workoutTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="date"
            label="Date"
            value={newWorkout.date}
            onChange={(e) =>
              setNewWorkout({ ...newWorkout, date: e.target.value })
            }
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="number"
            label="Duration (minutes)"
            value={newWorkout.duration}
            onChange={(e) =>
              setNewWorkout({ ...newWorkout, duration: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            type="number"
            label="Calories Burned"
            value={newWorkout.caloriesBurned}
            onChange={(e) =>
              setNewWorkout({ ...newWorkout, caloriesBurned: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Notes"
            value={newWorkout.notes}
            onChange={(e) =>
              setNewWorkout({ ...newWorkout, notes: e.target.value })
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
            disabled={!newWorkout.type || !newWorkout.date || !newWorkout.duration}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Workouts
