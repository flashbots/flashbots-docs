## Troubleshooting

### `registerValidator` errors

Often shows up in MEV-boost logs as 502 errors in `registerValidator` request.

### Logs contain `not a known validator`

This means the relay doesn't know about this validator and thinks it is not active or pending based on what it received from the beacon node.

**Solution:**

- Make sure you can find the validator like this on the beacon chain explorer: [https://prater.beaconcha.in/validator/0x982dd72a5e4fd203113e309dacd5268c3d84c4404425deec858e26dc2e982e3ff17f1f412881664fe0f18c9a0d17632f](https://prater.beaconcha.in/validator/0x982dd72a5e4fd203113e309dacd5268c3d84c4404425deec858e26dc2e982e3ff17f1f412881664fe0f18c9a0d17632f)
- If the validator can be found in prater.beaconcha.in, then create a Github issue with the beaconcha.in link and the mev-boost logs

### Logs contain `context deadline exceeded`

- This means that the the request didn't finish in time until the mev-boost request timeout expires.
- Sending 1k validator registrations is about 500KB of data, to get an estimate.
- Slow connections from mev-boost to the relay might take more than 2 seconds to establish the connection and send the data resulting in a timeout.

**Solution:**

- Ensure your server has good connectivity (and bandwidth) to the US.
- Configure a smaller validatorRegistration bucket size on the beacon node (instead of sending up to 1k at once, try with 500).
- Increase MEV-boost request timeout - eg. 3.5s: `request-timeout 3500`