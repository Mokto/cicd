workflow "Workflow" {
  on = "push"
  resolves = ["Clone project"]
}

action "Clone project" {
  uses = "./github/clone"
  args = ["Mokto/docker-kaniko-test"]
}

action "HTTP client" {
  needs = ["Clone project"]
  uses = "Ilshidur/action-slack@master"
  secrets = ["SLACK_WEBHOOK"]
  args = "A new commit has been pushed"
}