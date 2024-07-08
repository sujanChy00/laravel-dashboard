<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::query();
        $params = request()->query();
        $sort_by = request('sort_by', 'created_by');
        $sort_order = request('sort_order', 'asc');
        if (request()->has('name')) {
            $tasks->where('name', 'like', '%' . request()->query('name') . "%");
        }
        if (request()->has('status')) {
            $tasks->where("status", request()->query('status'));
        }
        $user = Auth::user();
        return Inertia::render('task/index', [
            'tasks' => $tasks->orderBy($sort_by, $sort_order)->paginate(10),
            'params' => $params
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        $projects = $user->projects;
        return Inertia::render('task/create', [
            'users' => User::all(),
            'projects' => Project::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store()
    {

        $attributes = request()->validate([
            'name' => ['required'],
            'description' => ['nullable'],
            'image_path' => ['nullable'],
            'due_date' => ['required'],
            'assigned_user_id' => ['required'],
            'project_id' => ['required'],
            'status' => ['required', Rule::in(['pending', 'completed', 'in_progress'])],
            'priority' => ['required', Rule::in(['high', 'low', 'medium'])],
        ]);
        $user = Auth::user();
        $attributes['created_by'] = $user;
        $attributes['updated_by'] = $user;

        Task::create($attributes);

        return redirect()->route('task.index')->with('success', 'Task created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return Inertia::render('task/show', [
            'task' => $task
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)

    {
        return Inertia::render('task/edit', [
            'users' => User::all(),
            'projects' => Project::all(),
            'task' => $task
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Task $task)
    {
        $attributes = request()->validate([
            'name' => ['required'],
            'description' => ['nullable'],
            'image_path' => ['nullable'],
            'due_date' => ['required'],
            'assigned_user_id' => ['required'],
            'project_id' => ['required'],
            'status' => ['required', Rule::in(['pending', 'completed', 'in_progress'])],
            'priority' => ['required', Rule::in(['high', 'low', 'medium'])],
        ]);
        $user = Auth::user();
        $attributes['updated_by'] = $user;

        $task->update($attributes);

        return redirect()->route('task.index')->with('success', 'Task updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()->route('task.index')->with('success', 'Task deleted successfully');
    }
}
