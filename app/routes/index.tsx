import { Anchor, Container, Header, Table, Text } from "@mantine/core";
import { useLoaderData } from "remix";
import { getMergeRequests } from "~/gitlab/merge-requests.server";

export const loader = async () => {
  return getMergeRequests();
};

export default function Index() {
  const mergeRequests = useLoaderData<Awaited<ReturnType<typeof loader>>>();

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
  ));

  return (
    <Container>
      <Header height={70} p="md">
        {/* Handle other responsive styles with MediaQuery component or createStyles function */}
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
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
  );
}
