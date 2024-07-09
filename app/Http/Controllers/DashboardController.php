<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $users = User::count();
        $totalProjects = Project::count();
        $totalTask = Task::count();
        $pendingProjects = Project::where('status', 'pending')->count();
        $completedProjects = Project::where('status', 'completed')->count();
        $inProgressProjects = Project::where('status', 'in_progress')->count();
        $mediumTask = Task::where('priority', 'medium')->count();
        $highTask = Task::where('priority', 'high')->count();
        $lowTask = Task::where('priority', 'low')->count();
        return Inertia::render('Dashboard', [
            'totalUsers' => $users,
            'projects' => [
                'total' => $totalProjects,
                'chartData' => [
                    ['status' => "pending", "count" => $pendingProjects, "fill" => "#E55770"],
                    ['status' => "in progress", "count" => $inProgressProjects, "fill" => "#E88C30"],
                    ['status' => "completed", "count" => $completedProjects, "fill" => "#62B98A"]
                ],
                'chartConfig' => [
                    'pending' => ['label' => "pending", "fill" => "#E55770"],
                    'in_progress' => ['label' => "in progress", "fill" => "#E88C30"],
                    'completed' => ['label' => "completed", "fill" => "#62B98A"],
                ]
            ],
            'tasks' => [
                'total' => $totalTask,
                'chartData' => [
                    ['status' => "high", "count" => $highTask, "fill" => "#5F2333"],
                    ['status' => "medium", "count" => $mediumTask, "fill" => "#E88C30"],
                    ['status' => "low", "count" => $lowTask, "fill" => "#62B98A"]
                ],
                'chartConfig' => [
                    'high' => ['label' => "high", "fill" => "#5F2333"],
                    'medium' => ['label' => "medium", "fill" => "#E88C30"],
                    'low' => ['label' => "low", "fill" => "#62B98A"]
                ]
            ]
        ]);
    }
}
