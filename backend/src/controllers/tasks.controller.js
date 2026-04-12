import { supabaseAdmin } from '../config/supabase.js';

// GET /api/tasks
// Returns tasks visible to the current user's track
export async function getTasks(req, res) {
  const { role } = req.userProfile;

  let query = supabaseAdmin
    .from('tasks')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  // Non-admins only see tasks for their track (or 'all')
  if (role !== 'admin') {
    const userTrack = role === 'vc' ? 'vc' : 'startup';
    query = query.in('track', [userTrack, 'all']);
  }

  const { data, error } = await query;
  if (error) {
    console.error('getTasks error:', error);
    return res.status(500).json({ error: 'Failed to load tasks' });
  }

  return res.json({ tasks: data });
}

// POST /api/tasks  (admin only)
export async function createTask(req, res) {
  const {
    title,
    description,
    due_date,
    track = 'all',
    requires_file = true,
    allowed_file_types,
    max_file_size_mb = 50,
    storage_bucket,
    sort_order = 0,
  } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Task title is required' });
  }
  if (!['startup', 'vc', 'all'].includes(track)) {
    return res.status(400).json({ error: 'track must be startup, vc, or all' });
  }

  const { data, error } = await supabaseAdmin
    .from('tasks')
    .insert({
      title,
      description: description || null,
      due_date: due_date || null,
      track,
      requires_file,
      allowed_file_types: allowed_file_types || null,
      max_file_size_mb,
      storage_bucket: storage_bucket || 'task-submissions',
      sort_order,
      created_by: req.user.id,
    })
    .select()
    .single();

  if (error) {
    console.error('createTask error:', error);
    return res.status(500).json({ error: 'Failed to create task' });
  }

  return res.status(201).json({ task: data });
}

// PUT /api/tasks/:id  (admin only)
export async function updateTask(req, res) {
  const { id } = req.params;
  const {
    title,
    description,
    due_date,
    track,
    requires_file,
    allowed_file_types,
    max_file_size_mb,
    storage_bucket,
    sort_order,
  } = req.body;

  const updates = {};
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (due_date !== undefined) updates.due_date = due_date;
  if (track !== undefined) updates.track = track;
  if (requires_file !== undefined) updates.requires_file = requires_file;
  if (allowed_file_types !== undefined) updates.allowed_file_types = allowed_file_types;
  if (max_file_size_mb !== undefined) updates.max_file_size_mb = max_file_size_mb;
  if (storage_bucket !== undefined) updates.storage_bucket = storage_bucket;
  if (sort_order !== undefined) updates.sort_order = sort_order;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  const { data, error } = await supabaseAdmin
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('updateTask error:', error);
    return res.status(500).json({ error: 'Failed to update task' });
  }
  if (!data) {
    return res.status(404).json({ error: 'Task not found' });
  }

  return res.json({ task: data });
}

// DELETE /api/tasks/:id  (admin only)
export async function deleteTask(req, res) {
  const { id } = req.params;

  const { error } = await supabaseAdmin
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('deleteTask error:', error);
    return res.status(500).json({ error: 'Failed to delete task' });
  }

  return res.json({ message: 'Task deleted' });
}
