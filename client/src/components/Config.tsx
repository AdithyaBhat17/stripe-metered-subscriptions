import { useConfig } from "../context/config";
import { FormGroup } from "../styles";

export default function Config() {
  const { vm, users, csp, updateConfig } = useConfig();

  return (
    <form method="post">
      <h2>Configure Backup Options</h2>
      <FormGroup>
        <label htmlFor="vm">Select the number of VMs to backup.</label>
        <input
          value={vm}
          onChange={updateConfig}
          required
          type="number"
          name="vm"
          id="vm"
          step="1"
          min="0"
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="users">
          Select the number of Office365 accounts to backup.
        </label>
        <input
          value={users}
          onChange={updateConfig}
          required
          type="number"
          name="users"
          id="users"
          step="1"
          min="0"
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="csp">Select the Cloud Storage option</label>
        <select
          value={csp}
          onChange={updateConfig}
          css={{ padding: "1rem" }}
          required
          name="csp"
          id="csp"
        >
          <option value="" disabled selected>
            Select an option
          </option>
          <option value="aws">AWS S3</option>
          <option value="azure">Microsoft Azure Blob Storage</option>
          <option value="gcp">Google Cloud Platform</option>
        </select>
      </FormGroup>
    </form>
  );
}
