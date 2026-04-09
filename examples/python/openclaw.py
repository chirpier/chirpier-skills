# pyright: reportMissingImports=false

from chirpier import new_client, Log

client = new_client(api_key="chp_your_api_key")
client.log(
    Log(
        agent="openclaw.main",
        event="task.duration_ms",
        value=420,
        meta={"task_name": "email_triage"},
    )
)
client.flush()
client.close()
