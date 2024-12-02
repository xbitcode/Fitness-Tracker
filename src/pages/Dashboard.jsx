import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
} from '@mui/material'
import {
  DirectionsRun,
  LocalFireDepartment,
  Timer,
  FitnessCenter,
} from '@mui/icons-material'
import { LineChart } from '@mui/x-charts'

const StatCard = ({ title, value, icon, progress }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon}
        <Typography variant="h6" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {value}
      </Typography>
      <LinearProgress variant="determinate" value={progress} />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {progress}% of daily goal
      </Typography>
    </CardContent>
  </Card>
)

const Dashboard = () => {
  const mockData = {
    steps: { value: '8,432', progress: 70 },
    calories: { value: '1,842', progress: 85 },
    activeMinutes: { value: '48', progress: 60 },
    workouts: { value: '2', progress: 66 },
  }

  const chartData = {
    xAxis: [{ data: [1, 2, 3, 4, 5, 6, 7] }],
    series: [
      {
        data: [8000, 7500, 9000, 8700, 8200, 8800, 8432],
        area: true,
      },
    ],
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Steps"
            value={mockData.steps.value}
            icon={<DirectionsRun color="primary" />}
            progress={mockData.steps.progress}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Calories"
            value={mockData.calories.value}
            icon={<LocalFireDepartment color="error" />}
            progress={mockData.calories.progress}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Minutes"
            value={mockData.activeMinutes.value}
            icon={<Timer color="success" />}
            progress={mockData.activeMinutes.progress}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Workouts"
            value={mockData.workouts.value}
            icon={<FitnessCenter color="secondary" />}
            progress={mockData.workouts.progress}
          />
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Weekly Steps
          </Typography>
          <Box sx={{ width: '100%', height: 300 }}>
            <LineChart
              xAxis={chartData.xAxis}
              series={chartData.series}
              height={300}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Dashboard
