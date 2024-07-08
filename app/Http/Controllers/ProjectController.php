<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Models\User;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $query = Project::query();
        $projects = $query;
        $params = request()->query();
        $sort_by = request('sort_by', 'created_by');
        $sort_order = request('sort_order', 'asc');

        if (request()->has('name')) {
            $projects->where('name', 'like', '%' . request()->query('name') . '%');
        }

        if (request()->has('status')) {
            $projects->where('status',  request()->query('status'));
        }

        return Inertia::render("project/index", [
            'projects' => $projects->orderBy($sort_by, $sort_order)->latest()->paginate(10),
            // 'projects' => ProjectResource::collection($projects->orderBy(
            //     $sort_by,
            //     $sort_order
            // )->paginate(10)),
            "params" => $params
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('project/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store()
    {
        // $table->foreignId('created_by')->constrained('users');
        // $table->foreignId('updated_by')->constrained('users');
        $attributes = request()->validate([
            'name' => ['required'],
            'description' => ['required'],
            'image_path' => 'nullable',
            'due_date' => ['nullable'],
            'status' => ['required']
        ]);

        $user = Auth::user();
        $attributes['created_by'] = $user;
        $attributes['updated_by'] = $user;
        $attributes['user_id'] = $user->id;

        Project::create($attributes);

        return redirect()->route('project.index')->with('success', 'Project created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)

    {
        $params = request()->query();
        $tasks = $project->tasks()->latest()->paginate(10);
        $userProject = new ProjectResource($project);
        return Inertia::render('project/show', [
            'project' => $userProject,
            'tasks' => $tasks,
            'params' => $params
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {

        return Inertia::render('project/edit', ['project' => $project]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Project $project)
    {
        $attributes = request()->validate([
            'name' => ['required'],
            'description' => ['required'],
            'image_path' => 'nullable',
            'due_date' => ['nullable'],
            'status' => ['required']
        ]);

        $user = Auth::user();
        $attributes['updated_by'] = $user;
        $project->update($attributes);

        return redirect()->route('project.show', $project)->with('success', 'Project updated successfully');
    }
    // public function update(UpdateProjectRequest $request, Project $project)
    // {
    //     dd($project);
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('project.index')->with('success', 'Project deleted successfully');
    }
}
