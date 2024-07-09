<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Models\Task;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::redirect('/', 'dashboard');

Route::get('/', fn () => Inertia::render('Welcome'));

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/project', [ProjectController::class, 'index'])->name('project.index');
    Route::get('/project/{project}/edit', [ProjectController::class, 'edit'])->name('project.edit');
    Route::patch('/project/{project}/edit', [ProjectController::class, 'update'])->name('project.update');
    Route::get('/project/{project}/show', [ProjectController::class, 'show'])->name('project.show');
    Route::get('/project/create', [ProjectController::class, 'create'])->name('project.create');
    Route::put('/project/create', [ProjectController::class, 'store'])->name('project.store');
    Route::delete('/project/{project}/delete', [ProjectController::class, 'destroy'])->name('project.delete');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/user', [UserController::class, 'index'])->name('users.index');
    Route::get('/user/{user}/show', [UserController::class, 'show'])->name('users.show');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/task', [TaskController::class, 'index'])->name('task.index');
    Route::get('/task/{task}/show', [TaskController::class, 'show'])->name('task.show');
    Route::get('/task/{task}/edit', [TaskController::class, 'edit'])->name('task.edit');
    Route::get('/task/create', [TaskController::class, 'create'])->name('task.create');
    Route::put('/task/create', [TaskController::class, 'store'])->name('task.store');
    Route::patch('/task/{task}/edit', [TaskController::class, 'update'])->name('task.update');
    Route::delete('/task/{task}/delete', [TaskController::class, 'destroy'])->name('task.delete');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
