import {
  Anchor,
  Container,
  Header,
  Table,
  Text,
  useMantineTheme
} from '@mantine/core'
import { useState } from 'react'
import { useLoaderData } from 'remix'
import { getMergeRequests } from '~/gitlab/merge-requests.server'

export const loader = async () => {
  return getMergeRequests()
}

export default function Index() {
  const mergeRequests = useLoaderData()

  const [opened, setOpened] = useState(false)
  const theme = useMantineTheme()

  // return (
  //   <AppShell
  //     // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
  //     navbarOffsetBreakpoint="sm"
  //     // fixed prop on AppShell will be automatically added to Header and Navbar
  //     fixed
  //     navbar={
  //       <Navbar
  //         p="md"
  //         // Breakpoint at which navbar will be hidden if hidden prop is true
  //         hiddenBreakpoint="sm"
  //         // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
  //         hidden={!opened}
  //         // when viewport size is less than theme.breakpoints.sm navbar width is 100%
  //         // viewport size > theme.breakpoints.sm – width is 300px
  //         // viewport size > theme.breakpoints.lg – width is 400px
  //         width={{ sm: 300, lg: 400 }}
  //       >
  //         <Text>Application navbar</Text>
  //       </Navbar>
  //     }
  //     header={
  //       <Header height={70} p="md">
  //         {/* Handle other responsive styles with MediaQuery component or createStyles function */}
  //         <div
  //           style={{ display: 'flex', alignItems: 'center', height: '100%' }}
  //         >
  //           <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
  //             <Burger
  //               opened={opened}
  //               onClick={() => setOpened((o) => !o)}
  //               size="sm"
  //               color={theme.colors.gray[6]}
  //               mr="xl"
  //             />
  //           </MediaQuery>

  //           <Text>Application header</Text>
  //         </div>
  //       </Header>
  //     }
  //   >
  //     <Text>Resize app to see responsive navbar in action</Text>
  //   </AppShell>
  // )

  const rows = mergeRequests.map((mr) => (
    <tr key={mr.id}>
      <td>{mr.author.name}</td>
      <td>
        <Anchor
          href={mr.project.http_url_to_repo}
          target="_blank"
          rel="noreferrer"
        >
          {mr.project.name}
        </Anchor>
      </td>
      <td>
        <Anchor href={mr.web_url} target="_blank" rel="noreferrer">
          {mr.title}
        </Anchor>
      </td>
    </tr>
  ))

  return (
    <Container>
      <Header height={70} p="md">
        {/* Handle other responsive styles with MediaQuery component or createStyles function */}
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Text>MR UI</Text>
        </div>
      </Header>

      {rows.length > 0 ? (
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Author</th>
              <th>Project</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      ) : null}
    </Container>
  )
}
