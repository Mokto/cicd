package api

import (
	"actions/protos"
	"strings"

	"github.com/actions/workflow-parser/parser"
	"golang.org/x/net/context"
)

// Server represents the gRPC server
type Server struct {
}

// ParseWorkflow parse the workflow and returns
func (s *Server) ParseWorkflow(ctx context.Context, req *protos.WorkflowRequest) (*protos.WorkflowResponse, error) {

	config, err := parser.Parse(strings.NewReader(req.FileContent))
	if err != nil {
		return nil, err
	}

	actions := []*protos.Action{}
	for _, action := range config.Actions {
		var run []string
		if action.Runs != nil {
			run = action.Runs.Split()
		} else {
			run = nil
		}
		actions = append(actions, &protos.Action{
			Identifier: action.Identifier,
			Uses:       action.Uses.String(),
			Env:        action.Env,
			Secrets:    action.Secrets,
			Args:       action.Args.Split(),
			Runs:       run,
			Needs:      action.Needs,
		})
	}
	workflows := []*protos.Workflow{}
	for _, workflow := range config.Workflows {
		workflows = append(workflows, &protos.Workflow{
			Identifier: workflow.Identifier,
			On:         workflow.On,
			Resolves:   workflow.Resolves,
		})
	}

	return &protos.WorkflowResponse{
		Actions:   actions,
		Workflows: workflows,
	}, nil
}
