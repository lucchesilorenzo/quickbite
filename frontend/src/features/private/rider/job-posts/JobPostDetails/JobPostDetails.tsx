import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CheckIcon from "@mui/icons-material/Check";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PaymentsIcon from "@mui/icons-material/Payments";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function JobPostDetails() {
  return (
    <Card variant="outlined">
      <CardHeader
        title={
          <Typography variant="h5" sx={{ my: 1, fontWeight: 500 }}>
            Full Stack Developer
          </Typography>
        }
        subheader={
          <Box>
            <MuiLink
              component={Link}
              to="/"
              underline="hover"
              gutterBottom
              color="textSecondary"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "underline",
                gap: 0.5,
                "&:hover": { color: "info.main" },
              }}
            >
              <Typography variant="body2">Company name</Typography>

              <OpenInNewIcon fontSize="inherit" />
            </MuiLink>

            <Typography variant="body2" color="textSecondary" gutterBottom>
              Postcode City
            </Typography>

            <Typography variant="body1" color="textPrimary" gutterBottom>
              Salary
            </Typography>

            <Button variant="contained" color="info">
              Apply now
            </Button>
          </Box>
        }
      />

      <Divider />

      <Box sx={{ maxHeight: 600, overflowY: "auto" }}>
        <CardContent>
          <Box>
            <Typography variant="h6" gutterBottom>
              Job post details
            </Typography>

            <Stack spacing={4}>
              <Stack direction="row" spacing={1}>
                <PaymentsIcon fontSize="inherit" />

                <Stack spacing={1}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Salary
                  </Typography>

                  <Chip
                    icon={<CheckIcon />}
                    color="success"
                    label="30.000 € a year"
                    size="small"
                    sx={{ fontWeight: 500 }}
                  />
                </Stack>
              </Stack>

              <Stack direction="row" spacing={1}>
                <BusinessCenterIcon fontSize="inherit" />

                <Stack spacing={1}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Employment type
                  </Typography>

                  <Chip
                    icon={<CheckIcon />}
                    color="success"
                    label="Full-time"
                    size="small"
                    sx={{ fontWeight: 500 }}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </CardContent>

        <Divider />

        <CardContent>
          <Box>
            <Typography variant="h6" gutterBottom>
              Complete description of the position
            </Typography>

            <Typography variant="body1" gutterBottom>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
              dolores vitae fugit reprehenderit aut dignissimos commodi ea ipsa
              molestias aliquid quibusdam, assumenda quaerat obcaecati
              consequatur repellat tenetur nemo! Dolor, nam distinctio enim nemo
              voluptatibus excepturi consequuntur sequi ea quisquam temporibus?
              Unde optio nobis, quam nesciunt harum eos. Earum iusto, laborum
              fugit at repellat perspiciatis, quibusdam illo ut reprehenderit
              porro consectetur. Perferendis aliquam distinctio consequuntur
              pariatur ipsum eius, neque iusto blanditiis molestias asperiores!
              Quod facere voluptatibus blanditiis culpa sunt ipsa. Aut
              repellendus commodi placeat eum cum accusantium earum at
              consequuntur suscipit molestiae aliquid dolore ex tenetur dicta
              laudantium repellat tempora reiciendis magni, maiores, rem officia
              eveniet. Magni incidunt explicabo eligendi. Repellendus
              necessitatibus quaerat, dolores repellat quis corporis animi
              similique in iste voluptas rem dignissimos, commodi excepturi
              dicta facilis quod at. Et cum perspiciatis, modi nulla assumenda
              rerum laboriosam magni impedit, est veniam delectus sunt expedita
              nobis eos repellendus praesentium ab rem alias ea suscipit
              similique earum. Alias voluptates doloremque temporibus neque est
              at rerum necessitatibus nesciunt, commodi voluptatum magnam dolore
              optio quibusdam magni vero rem tempora facere omnis esse veniam
              quasi voluptatem nisi? Recusandae alias ab modi, impedit
              asperiores laboriosam illum culpa dignissimos debitis molestiae
              saepe quam, voluptatum accusamus enim eligendi nam excepturi.
              Corporis debitis nam impedit velit repellat unde id amet. Quo quis
              repellendus voluptas explicabo beatae animi necessitatibus
              doloremque? Praesentium optio autem, ipsam impedit cupiditate
              commodi unde numquam harum fuga, dolor sunt magnam consequatur
              nostrum nesciunt incidunt rem assumenda totam earum doloremque
              similique debitis voluptatum suscipit. Labore iste nobis
              perspiciatis? Doloremque quasi ad facilis explicabo officiis illum
              necessitatibus architecto repudiandae aspernatur adipisci laborum
              nostrum exercitationem ducimus, asperiores provident sint labore
              iste hic rem, similique obcaecati commodi expedita? Quidem,
              incidunt illum molestiae cum magnam fugit necessitatibus
              laboriosam adipisci aliquid labore, quos nisi ea rem, consequuntur
              ratione impedit temporibus facilis iure!
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
