workflow "New workflow" {
  on = "push"
  resolves = ["HTTP client"]
}

action "HTTP client" {
  uses = "Ilshidur/action-slack@master"
  secrets = ["SLACK_WEBHOOK"]
  args = "A new commit has been pushed"
}